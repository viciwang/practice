//
//  AppsoAPI.swift
//  So-AppSo
//
//  Created by Allen on 08/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import Foundation
import Moya
import Alamofire
import RxSwift

enum AppsoAPI {
    case start
}

extension AppsoAPI: TargetType {
    
    var baseURL: URL { return URL(string: "")! }
    
    var path: String {
        switch self {
        case .start:
            return "123"
        }
    }
    
    var method: Moya.Method {
        return .get
    }
    
    var sampleData: Data {
        return Data()
    }
    
    var task: Task {
        return .requestPlain
    }
    
    var validate: Bool {
        return true
    }
    
    var headers: [String : String]? {
        return nil
    }
}
