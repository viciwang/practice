//
//  HomeViewController.swift
//  So-AppSo
//
//  Created by Allen on 13/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import SnapKit

class HomeViewController: UIViewController {
    
    fileprivate var collectionView: UICollectionView! = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
}

// MARK: UI stuff

private extension HomeViewController {
    
    func setupUI() {
        view.backgroundColor = UIColor.white
        setupCollectionView()
    }
    
    func setupCollectionView() {
        collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: UICollectionViewFlowLayout())
//        collectionView.delegate = self
//        collectionView.dataSource = self
        view.addSubview(collectionView)
        collectionView.snp.makeConstraints { make in
            make.edges.equalTo(view)
        }
    }
}


