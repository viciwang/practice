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

class Networking {
    
    static let shared: Networking = Networking()
    
    let provider: MoyaProvider<AppsoAPI> = MoyaProvider<AppsoAPI>()
    let online: Observable<Bool> = connectedToInternetOrStubbing()
}

extension Networking {
    
    func request(_ token: AppsoAPI) -> Single<Response> {
        return online
            .filter { $0 }
            .take(1)
            .asSingle()
            .flatMap { _ in self.provider.rx.request(token) }
    }
}
