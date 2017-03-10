//
//  MovieListViewController.swift
//  Movie
//
//  Created by Allen on 27/02/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import SnapKit
import RxSwift
import RxCocoa

class MovieListViewController: UIViewController, UITableViewDataSource {
    
    private let tableView = UITableView()
    private let disposeBag = DisposeBag()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupData()
    }
    
    func setupUI() {
        view.addSubview(tableView)
        tableView.snp.makeConstraints { make in
            make.edges.equalTo(view)
        }
        tableView.register(MovieListTableViewCell.self,
                           forCellReuseIdentifier: MovieListTableViewCell.cellIdentifier)
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    func setupData() {
        
    }
    
}

// MARK: UITableViewDelegate

extension MovieListViewController: UITableViewDelegate {

    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell: MovieListTableViewCell = tableView.dequeueReusableCell(withIdentifier: MovieListTableViewCell.cellIdentifier,
                                                                         for: indexPath) as! MovieListTableViewCell
        cell.config("123")
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80
    }

}
