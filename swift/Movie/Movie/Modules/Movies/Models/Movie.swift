//
//  Movie.swift
//  Movie
//
//  Created by Allen on 08/03/2017.
//  Copyright © 2017 Allen. All rights reserved.
//

import UIKit
import Alamofire

class Movie: NSObject {
    var name = ""
    var image: UIImage?
    var movieDescription = ""
    var star = ""
    var videoUrl = ""
    var showTimeInfo = ""
    var score: Float = 0.0
    
    func test() {
        var header = Alamofire.SessionManager.defaultHTTPHeaders
        header["DNT"] = "123"
        
        let configuration = URLSessionConfiguration.default
        configuration.httpAdditionalHeaders = header
        
        let sessionManager = SessionManager(configuration: configuration)
        
        let delegate = sessionManager.delegate
        
        let url = URL(string: "https://www.google.com/search")!
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        
        let parameters = ["foo": "bar"]
        
        do {
            urlRequest.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: [])
        } catch {
            
        }
        
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        Alamofire.request(urlRequest).responseJSON {_ in 
            
        }
        
    }
}
