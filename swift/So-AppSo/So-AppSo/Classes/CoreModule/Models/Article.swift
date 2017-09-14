//
//  Article.swift
//  So-AppSo
//
//  Created by Allen on 14/09/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import Foundation
import SwiftyJSON

struct ArticleCoverImage {
    let id: String
    let image: String
}

struct ArticleAuthor: JSONAbleType {
    let avatar: String
    let id: Int
    let nickname: String
    let profileId: Int
    
    static func fromJSON(_ json: [String : Any]) -> ArticleAuthor {
        let json = JSON(json)
        return ArticleAuthor(avatar: json["avatar"].stringValue,
                             id: json["id"].intValue,
                             nickname: json["nickname"].stringValue,
                             profileId: json["profile_id"].intValue)
    }
}

struct Article: JSONAbleType {
    
    let app: [String]
    let content: String
    let coverImage: ArticleCoverImage
    let author: ArticleAuthor
    let id: String
    let publishedTime: UInt64
    let title: String
    
    static func fromJSON(_ json: [String : Any]) -> Article {
        let json = JSON(json)
        let coverImage = ArticleCoverImage(id: json["cover_image"]["id"].stringValue, image: json["cover_image"]["image"].stringValue)
        let author = ArticleAuthor.fromJSON(json["created_by"].dictionaryValue)
        
        return Article(app: json["app"].arrayValue.map { $0.stringValue },
                       content: json["content"].stringValue,
                       coverImage:coverImage,
                       author: author,
                       id: json["id"].stringValue,
                       publishedTime: json["published_at"].uInt64Value,
                       title: json["title"].stringValue)
    }
}
