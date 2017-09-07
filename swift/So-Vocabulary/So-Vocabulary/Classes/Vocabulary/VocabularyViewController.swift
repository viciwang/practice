//
//  VocabularyViewController.swift
//  So-Vocabulary
//
//  Created by Allen on 01/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import SnapKit

class VocabularyViewController: UIViewController {

    let tableView = UITableView(frame: .zero, style: .plain)
    var vocabularies: [String] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "haha"
        setupUI()
    }
}

private extension VocabularyViewController {
    
    enum TableViewIdentifier: String {
        case TableViewCell = "TableViewCell"
    }
    
    func setupUI() {
        setupTableView()
    }
    
    func setupTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: TableViewIdentifier.TableViewCell.rawValue)
        
        view.addSubview(tableView)
        tableView.snp.makeConstraints { (make) in
            make.edges.equalTo(view)
        }
    }
}

extension VocabularyViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }
    
}

extension VocabularyViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return vocabularies.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: TableViewIdentifier.TableViewCell.rawValue, for: indexPath)
        return cell;
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 45;
    }
    
}
