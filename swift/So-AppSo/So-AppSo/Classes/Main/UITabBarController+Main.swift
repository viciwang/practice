//
//  UITabBarController+Main.swift
//  So-AppSo
//
//  Created by Allen on 13/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

extension UITabBarController {
    
    static func main() -> UITabBarController {
        let tab = UITabBarController()
        tab.viewControllers = [tab.buildViewController(title: "haha"), tab.buildViewController(title: "hhaa"), tab.buildViewController(title: "ahah"), tab.buildViewController(title: "aahh")]
        return tab
    }
    
    private func buildViewController(title: String) -> UINavigationController {
        let vc = HomeViewController()
        vc.title = title
        let nav = UINavigationController(rootViewController: vc)
        return nav
    }
    
}
