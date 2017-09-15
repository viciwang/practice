//
//  ArticleCell.swift
//  So-AppSo
//
//  Created by Allen on 15/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import Kingfisher

class HomeArticleCell: UICollectionViewCell {
    
    lazy var titleLabel = { return HomeArticleCell.setupTitleLabel() }()
    lazy var authorLabel = { return HomeArticleCell.setupAuthorLabel() }()
    lazy var titleImageView = UIImageView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func config(withArticle article: Article) {
        titleLabel.text = article.title
        authorLabel.text = article.author.nickname
        titleImageView.kf.setImage(with: URL(string: article.coverImage.image))
    }
    
    func setupUI() {
        contentView.addSubview(titleLabel)
        contentView.addSubview(authorLabel)
        contentView.addSubview(titleImageView)
        
        titleImageView.snp.makeConstraints { make in
            make.right.equalTo(contentView).offset(-5)
            make.top.equalTo(contentView).offset(5)
            make.size.equalTo(CGSize(width: 200, height: 150))
        }
        
        authorLabel.snp.makeConstraints { make in
            make.bottom.equalTo(contentView).offset(-5)
            make.left.equalTo(contentView).offset(5)
        }
        
        titleLabel.snp.makeConstraints { make in
            make.left.equalTo(contentView).offset(5)
            make.right.equalTo(titleImageView.snp.left).offset(-5)
            make.top.equalTo(titleImageView)
            make.bottom.equalTo(authorLabel.snp.top).offset(-5)
        }
    }
    
}

fileprivate extension HomeArticleCell {
    
    static func setupTitleLabel() -> UILabel {
        let label = UILabel()
        label.textColor = UIColor.black
        label.font = UIFont.systemFont(ofSize: 14)
        label.numberOfLines = 0
        let graphStyle = NSMutableParagraphStyle()
        graphStyle.lineSpacing = 4
        label.attributedText = NSMutableAttributedString(string: "",
                                                         attributes: [NSForegroundColorAttributeName: UIColor.black,
                                                                      NSFontAttributeName: UIFont.systemFont(ofSize: 14),
                                                                      NSParagraphStyleAttributeName: graphStyle])
        return label
    }
    
    static func setupAuthorLabel() -> UILabel {
        let label = UILabel()
        label.textColor = UIColor.gray
        label.font = UIFont.systemFont(ofSize: 12)
        return label
    }
}
