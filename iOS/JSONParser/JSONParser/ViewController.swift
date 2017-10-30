//
//  ViewController.swift
//  JSONParser
//
//  Created by shishir roy on 30/10/17.
//  Copyright © 2017 shishir roy. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // optional chaning
        
        //let path = Bundle.main.path(forResource: "usersAPI", ofType: "txt")
        //print(path ?? "Not a real path")
        
        guard let path = Bundle.main.path(forResource: "usersAPI", ofType: "txt") else {return}
        let url = URL(fileURLWithPath: path)
        //let data = try! Data(contentsOf: url)
        
        do {
            let data = try Data(contentsOf: url)
            print(data)
            //JSON Serialization of data
            let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers)
            print(json)
            
            guard let array = json as? [Any] else {
                return
            }
            
            for user in array {
                guard let userDict = user as? [String: Any] else { return }
                guard let userId = userDict["id"] as? Int else { print("not an Int"); return }
                guard let name = userDict["name"] as? String else { return }
                guard let company = userDict["company"] as? [String: String] else { return }
                guard let companyName = company["name"] else { return }
                print("----------------------")
                print(userId)
                print(name)
                print(companyName)
                print(" ")
            }
            
            
        } catch  {
            print(error)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

