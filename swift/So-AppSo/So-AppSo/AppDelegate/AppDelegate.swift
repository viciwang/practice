//
//  AppDelegate.swift
//  So-AppSo
//
//  Created by Allen on 27/08/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = UITabBarController.main()
        window?.makeKeyAndVisible()
        
        return true
    }
}

