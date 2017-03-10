//
//  MovieListTableViewCell.swift
//  Movie
//
//  Created by Allen on 07/03/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

class MovieListTableViewCell: UITableViewCell {
    
    static let cellIdentifier = "MovieListTableViewCell"
    
    private let titleLabel = UILabel()
    private let descriptionLabel = UILabel()
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupUI()
    }
    
    func setupUI() {
        titleLabel.font = UIFont.systemFont(ofSize: 14)
        titleLabel.textColor = UIColor.black
        contentView.addSubview(titleLabel)
        titleLabel.snp.makeConstraints { [unowned self] make in
            make.top.equalTo(self.contentView)
            make.left.equalTo(self.contentView).offset(10)
        }
    }
    
    func config(_ model: String) {
        titleLabel.text = model
    }

}
