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
            
        } catch  {
            print(error)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

