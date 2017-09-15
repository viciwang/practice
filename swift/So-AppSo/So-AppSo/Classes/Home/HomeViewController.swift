//
//  HomeViewController.swift
//  So-AppSo
//
//  Created by Allen on 13/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import SnapKit
import RxCocoa

class HomeViewController: UIViewController {
    
    enum Id: String {
        case ArticleCellIdentifier
    }
    
    fileprivate lazy var collectionView: UICollectionView = { return .homeCollectionViewWithDelegateDataSource(self) }()
    fileprivate lazy var viewModel: HomeViewModel = HomeViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        rxBinding()
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

// MARK: Rx binding

private extension HomeViewController {
    
    func rxBinding() {
        viewModel.articles
            .asObservable()
            .subscribe(onNext: { [weak self] _ in
                guard let strongSelf = self else { return }
                strongSelf.collectionView.reloadData()
            })
            .addDisposableTo(rx.disposeBag)
    }
}

extension HomeViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return viewModel.articles.value.count;
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: HomeViewController.Id.ArticleCellIdentifier.rawValue, for: indexPath) as! HomeArticleCell
        cell.config(withArticle: viewModel.articles.value[indexPath.item])
        return cell
    }
}

extension HomeViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: DeviceWidth, height: 160)
    }
}

fileprivate extension UICollectionView {
    
    class func homeCollectionViewWithDelegateDataSource(_ delegateDatasource: HomeViewController) -> UICollectionView {
        let collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: UICollectionViewFlowLayout())
        collectionView.backgroundColor = UIColor.white
        collectionView.delegate = delegateDatasource
        collectionView.dataSource = delegateDatasource
        collectionView.register(HomeArticleCell.self, forCellWithReuseIdentifier: HomeViewController.Id.ArticleCellIdentifier.rawValue)
        return collectionView;
    }
}


