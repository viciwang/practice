//
//  HeroCell.swift
//  So-GG
//
//  Created by Allen on 30/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit

class HeroCell: UICollectionViewCell {
    
    let heroImageView = UIImageView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.addSubview(heroImageView)
        heroImageView.backgroundColor = UIColor.gray
        heroImageView.frame = contentView.bounds
        heroImageView.layer.cornerRadius = 20
        heroImageView.clipsToBounds = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
