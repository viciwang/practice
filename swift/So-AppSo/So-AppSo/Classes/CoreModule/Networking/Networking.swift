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

class OnlineProvider<Target>: RxMoyaProvider<Target> where Target: TargetType {
    
    fileprivate let online: Observable<Bool>
    
    init(endpointClosure: @escaping EndpointClosure = MoyaProvider.defaultEndpointMapping,
         requestClosure: @escaping RequestClosure = MoyaProvider.defaultRequestMapping,
         stubClosure: @escaping StubClosure = MoyaProvider.neverStub,
         callbackQueue: DispatchQueue? = nil,
         manager: Manager = RxMoyaProvider<Target>.defaultAlamofireManager(),
         plugins: [PluginType] = [],
         trackInflights: Bool = false,
         online: Observable<Bool> = connectedToInternetOrStubbing()) {
        
        self.online = online
        super.init(endpointClosure: endpointClosure,
                   requestClosure: requestClosure,
                   stubClosure: stubClosure,
                   callbackQueue: callbackQueue,
                   manager: manager,
                   plugins: plugins,
                   trackInflights: trackInflights)
    }
    
    override func request(_ token: Target, callbackQueue: DispatchQueue? = nil) -> Single<Response> {
        let actualRequest = super.request(token)
        return online
            .filter { $0 }
            .take(1)
            .asSingle()
            .flatMap { _ in actualRequest }
    }
}

struct Networking {
    
    static let shared: Networking = {
        return Networking(provider: OnlineProvider<AppsoAPI>())
    }()
    
    let provider: OnlineProvider<AppsoAPI>
}

extension Networking {
    
    func request(_ token: AppsoAPI) -> Single<Response> {
        return provider.request(token)
    }
}
