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
    lazy var items: [String] = { return Array(repeating: "Haha", count: 100) }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.white
        collectionView.frame = view.bounds
        view.addSubview(collectionView)
    }
}

//MARK: collectionView

extension HomeViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: DeviceWidth - 40, height: (DeviceWidth - 40) * 1.2)
    }
}

extension HomeViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return items.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CollectionViewCell", for: indexPath)
        return cell
    }
}

extension UICollectionView {
    class func collectionViewwithDelegateDataSource(_ delegateDataSource: HomeViewController) -> UICollectionView {
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = 30
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: flowLayout)
        collectionView.backgroundColor = UIColor.white
        collectionView.delegate = delegateDataSource
        collectionView.dataSource = delegateDataSource
        collectionView.register(HeroCell.self, forCellWithReuseIdentifier: "CollectionViewCell")
        return collectionView
    }
}
