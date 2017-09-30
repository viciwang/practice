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
    case article
}

extension AppsoAPI: TargetType {
    
    var baseURL: URL { return URL(string: "https://sso.ifanr.com")! }
    
    var path: String {
        switch self {
        case .article:
            return "/api/v5/appso/article/"
        }
    }
    
    var method: Moya.Method {
        return .get
    }
    
    var sampleData: Data {
        switch self {
        case .article:
            return stubbedResponse(fileName: "article")
        }
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

func stubbedResponse(fileName: String) -> Data! {
    let file = Bundle.main.path(forResource: fileName, ofType: "json")!
    let data = (try? Data(contentsOf: URL(string: file)!))!
    return data
}
