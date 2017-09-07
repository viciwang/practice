//
//  TabBarController.swift
//  So-Vocabulary
//
//  Created by Allen on 01/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let titles = ["ha", "ha", "ha", "ha"]
        let originVCs = [
            VocabularyViewController(),
            VocabularyViewController(),
            VocabularyViewController(),
            VocabularyViewController()
        ]
        
        var vcs: [UINavigationController] = []
        for (index, vc) in originVCs.enumerated() {
            vc.tabBarItem.title = titles[index]
            vc.tabBarItem.setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.black], for: .normal)
            vc.tabBarItem.setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.black], for: .selected)
            vcs.append(UINavigationController(rootViewController: vc))
        }
        viewControllers = vcs
        
    }
}
