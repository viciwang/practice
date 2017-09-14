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
    
    fileprivate lazy var collectionView: UICollectionView = { return .homeCollectionViewWithDelegateDataSource(self) }()
    fileprivate lazy var viewModel: HomeViewModel = HomeViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        viewModel.loadData()
    }
}

// MARK: UI stuff

private extension HomeViewController {
    
    func setupUI() {
        view.backgroundColor = UIColor.white
        view.addSubview(collectionView)
        collectionView.snp.makeConstraints { make in
            make.edges.equalTo(view)
        }
    }
}

extension HomeViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 0;
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "", for: indexPath)
        return cell
    }
}

extension HomeViewController: UICollectionViewDelegate {
    
}

fileprivate extension UICollectionView {
    
    class func homeCollectionViewWithDelegateDataSource(_ delegateDatasource: HomeViewController) -> UICollectionView {
        let collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: UICollectionViewFlowLayout())
        collectionView.delegate = delegateDatasource
        collectionView.dataSource = delegateDatasource
        return collectionView;
    }
}


