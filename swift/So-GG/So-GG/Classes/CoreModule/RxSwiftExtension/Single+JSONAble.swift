//
//  RxSwift+MapObjectable.swift
//  So-AppSo
//
//  Created by Allen on 14/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import Foundation
import RxSwift

enum AppsoError: String {
    case couldNotParseJSON
}

extension AppsoError: Error {}

protocol JSONAbleType {
    
    static func fromJSON(_ json: [String: Any]) -> Self
    
}

extension PrimitiveSequence where Trait == SingleTrait {
    
    typealias Dictionary = [String: AnyObject]
    
    func mapTo<T: JSONAbleType>(object classType: T.Type) -> Single<T> {
        return self.map { json in
            guard let dict = json as? Dictionary else {
                throw AppsoError.couldNotParseJSON
            }
            
            return T.fromJSON(dict)
        }
    }
    
    func mapTo<T: JSONAbleType>(arrayOf classType: T.Type) -> Single<[T]> {
        return self.map { json in
            guard let array = json as? [AnyObject] else {
                throw AppsoError.couldNotParseJSON
            }
            
            guard let dicts = array as? [Dictionary] else {
                throw AppsoError.couldNotParseJSON
            }
            
            return dicts.map { T.fromJSON($0) }
        }
    }
    
}
