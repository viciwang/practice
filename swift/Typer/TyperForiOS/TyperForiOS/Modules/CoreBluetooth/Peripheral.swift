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
    
    override init() {
        super.init()
        peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
    }
}

extension Peripheral: CBPeripheralManagerDelegate {
    
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        
    }
    
}
