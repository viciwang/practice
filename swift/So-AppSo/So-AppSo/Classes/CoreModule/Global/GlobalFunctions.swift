//
//  GlobalFunctions.swift
//  So-AppSo
//
//  Created by Allen on 08/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import Foundation
import RxSwift
import ReachabilitySwift
import Dispatch

let DeviceWidth = UIScreen.main.bounds.width
let DeviceHeight = UIScreen.main.bounds.height

private let reachabilityManager = ReachabilityManager()

func connectedToInternetOrStubbing() -> Observable<Bool> {
    
    let stubbing = Observable.just(false)
    
    guard let online = reachabilityManager?.reach else {
        return stubbing
    }
    return Observable.combineLatest(online, stubbing) { $0 || $1 }
}

private class ReachabilityManager {
    
    private let reachability: Reachability
    
    private let _reach = ReplaySubject<Bool>.create(bufferSize: 1)
    var reach: Observable<Bool> {
        return _reach.asObserver()
    }
    
    init?() {
        guard let r = Reachability() else {
            return nil
        }
        self.reachability = r
        
        do {
            try self.reachability.startNotifier()
        } catch {
            return nil
        }
        
        self._reach.onNext(self.reachability.isReachable)
        
        self.reachability.whenReachable = { _ in
            DispatchQueue.main.async { self._reach.onNext(true) }
        }
        
        self.reachability.whenUnreachable = { _ in
            DispatchQueue.main.async { self._reach.onNext(false) }
        }
    }
}

