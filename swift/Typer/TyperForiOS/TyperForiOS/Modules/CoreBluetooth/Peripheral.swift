//
//  Peripheral.swift
//  TyperForiOS
//
//  Created by Allen on 30/03/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import CoreBluetooth

class Peripheral: NSObject {
    
    fileprivate var peripheralManager: CBPeripheralManager!
    fileprivate var service: CBMutableService!
    fileprivate var characteristic: CBMutableCharacteristic!
    
    override init() {
        super.init()
        peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
        service = CBMutableService(type: ServiceUUID, primary: true)
        characteristic = CBMutableCharacteristic(type: CharacteristicUUID, properties: .read, value: nil, permissions: .readable)
        service.characteristics = [characteristic]
        peripheralManager.add(service)
    }
}

extension Peripheral: CBPeripheralManagerDelegate {
    
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        
    }
    
    func peripheralManager(_ peripheral: CBPeripheralManager, didAdd service: CBService, error: Error?) {
        if let error = error {
            print("add service error: \(error.localizedDescription)")
            return
        }
        peripheralManager.startAdvertising([CBAdvertisementDataServiceUUIDsKey : [self.service.uuid]])
    }
    
    func peripheralManagerDidStartAdvertising(_ peripheral: CBPeripheralManager, error: Error?) {
        if let error = error {
            print("start advertising: \(error.localizedDescription)")
        }
        
    }
    
    func peripheralManager(_ peripheral: CBPeripheralManager, didReceiveRead request: CBATTRequest) {
        if request.characteristic.uuid.isEqual(characteristic.uuid) {
            guard characteristic.value != nil else {
                return
            }
            if request.offset > characteristic.value!.count {
                peripheralManager.respond(to: request, withResult: .invalidOffset)
            }
            else {
                request.value = characteristic.value!.subdata(in: request.offset..<characteristic.value!.count)
                peripheralManager.respond(to: request, withResult: .success)
            }
        }
    }
    
    func peripheralManager(_ peripheral: CBPeripheralManager, didReceiveWrite requests: [CBATTRequest]) {
        for request in requests {
            if !request.characteristic.uuid.isEqual(characteristic.uuid) {
                continue
            }
            characteristic.value = request.value
            self.peripheralManager.respond(to: requests[0], withResult: .success)
        }
    }
    
    func peripheralManager(_ peripheral: CBPeripheralManager, central: CBCentral, didSubscribeTo characteristic: CBCharacteristic) {
        if let updatedvalue = "123".data(using: .utf8) {
            peripheralManager.updateValue(updatedvalue, for: self.characteristic, onSubscribedCentrals: nil)
        }
        
        
    }
}
