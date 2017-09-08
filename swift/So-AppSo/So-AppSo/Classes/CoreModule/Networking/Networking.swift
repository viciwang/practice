//
//  File.swift
//  So-AppSo
//
//  Created by Allen on 08/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import Foundation
import Moya
import RxSwift
import Alamofire

//class OnlineProvider<Target>: RxMoyaProvider<Target> where Target: TargetType {
//    
//    fileprivate let online: Observable<Bool>
//    
//}

class Networking {
    
//    fileprivate let online: Observable<Bool> = 
    let provider = MoyaProvider<AppsoAPI>()
    
}

extension Networking {
    
    
    
    static func request() {
        
    }
}
