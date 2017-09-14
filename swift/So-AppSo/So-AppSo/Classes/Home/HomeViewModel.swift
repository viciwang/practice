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
            .subscribe(onSuccess: { _ in
                
            }, onError: { error in
                
            })
            .addDisposableTo(rx.disposeBag)
    }
    
}
