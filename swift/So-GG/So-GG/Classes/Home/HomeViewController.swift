//
//  HomeViewController.swift
//  So-GG
//
//  Created by Allen on 30/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {
    
    lazy var collectionView: UICollectionView = { return .collectionViewwithDelegateDataSource(self) }()

    override func viewDidLoad() {
        super.viewDidLoad()
    }
}

//MARK: collectionView

extension HomeViewController: UICollectionViewDelegate {
    
}

extension HomeViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return collectionView.dequeueReusableCell(withReuseIdentifier: "", for: indexPath)
    }
}

extension UICollectionView {
    class func collectionViewwithDelegateDataSource(_ delegateDataSource: HomeViewController) -> UICollectionView {
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: UICollectionViewFlowLayout())
        collectionView.delegate = delegateDataSource
        collectionView.dataSource = delegateDataSource
        
        return collectionView
    }
}
