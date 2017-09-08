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

func connectedToInternetOrStubbing() -> Observable<Bool> {
    return Observable.just(true)
}

//private class ReachabilityManger {
//    
//    private let reachability: Reachability
//    
//    
//}

