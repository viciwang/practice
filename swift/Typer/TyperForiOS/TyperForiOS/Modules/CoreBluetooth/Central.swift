//
//  Central.swift
//  TyperForiOS
//
//  Created by Allen on 30/03/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import CoreBluetooth

class Central: NSObject {
    
    fileprivate var centralManager: CBCentralManager!
    fileprivate var peripherals: [CBPeripheral] = []
    fileprivate var connectedPeripherals: [CBPeripheral] = []
    
    override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil)
    }
    
    func connect(peripheral: CBPeripheral) {
        centralManager.connect(peripheral, options: nil)
    }
    
    func disconnect(peripheral: CBPeripheral) {
        
    }
}

extension Central: CBCentralManagerDelegate {
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn {
            centralManager.scanForPeripherals(withServices: nil, options: nil)
        }
        else {
            
        }
    }
    
    func centralManager(_ central: CBCentralManager,
                        didDiscover peripheral: CBPeripheral,
                        advertisementData: [String : Any],
                        rssi RSSI: NSNumber) {
        peripherals.append(peripheral)
        
        let deviceName = advertisementData[CBAdvertisementDataLocalNameKey] as? String
        print("\(deviceName) connected")
    }
    
    func centralManager(_ central: CBCentralManager,
                        didConnect peripheral: CBPeripheral) {
        
        connectedPeripherals.append(peripheral)
        peripheral.delegate = self
        peripheral.discoverServices(nil)
    }
    
    func centralManager(_ central: CBCentralManager,
                        didDisconnectPeripheral peripheral: CBPeripheral,
                        error: Error?) {
        if let index = connectedPeripherals.index(of: peripheral) {
            connectedPeripherals.remove(at: index)
        }
    }
}

extension Central: CBPeripheralDelegate {
    
    func peripheral(_ peripheral: CBPeripheral,
                    didDiscoverServices error: Error?) {
        guard (peripheral.services != nil) else {
            return
        }
        
        for  service in peripheral.services! {
            if service.uuid == ServiceUUID {
                peripheral.discoverCharacteristics(nil, for: service)
            }
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral,
                    didDiscoverCharacteristicsFor service: CBService,
                    error: Error?) {
        guard (service.characteristics != nil) else {
            return
        }
        
        for characteristics in service.characteristics! {
            if characteristics.uuid == CharacteristicUUID {
                peripheral.setNotifyValue(true, for: characteristics)
            }
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral,
                    didUpdateValueFor characteristic: CBCharacteristic,
                    error: Error?) {
        if characteristic.uuid == CharacteristicUUID {
//            characteristic.value
        }
    }
}
