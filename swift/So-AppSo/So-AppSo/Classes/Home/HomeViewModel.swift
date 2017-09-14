//
//  HomeViewModel.swift
//  So-AppSo
//
//  Created by Allen on 14/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import RxSwift
import NSObject_Rx

class HomeViewModel: NSObject {
    
    let articles: Variable<[String]> = Variable([])
    
}

extension HomeViewModel {
    
    func loadData() {
        Networking.shared
            .request(.article)
            .mapJSON()
            .map { result -> [Any] in
                guard let r: [String: AnyObject] = result as? [String: AnyObject],
                    let articleJSONs: [AnyObject] = r["objects"] as? [AnyObject] else {
                        throw AppsoError.couldNotParseJSON
                }
                return articleJSONs
            }
            .mapTo(arrayOf: Article.self)
            .subscribe(onSuccess: { a in
                print("\(a)")
            }, onError: { error in
                
            })
            .addDisposableTo(rx.disposeBag)
    }
    
}
