//
//  ViewController.swift
//  AlamofireSample
//
//  Created by shishir roy on 02/12/17.
//  Copyright © 2017 shishir roy. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    @IBOutlet weak var priceLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        priceLabel.text = "...."
        
        Alamofire.request("http://192.168.1.2:3225")
            .responseJSON{response in
                if let responseData = response.result.value{
                    print(responseData)
                }
        }
        
        self.updateBitCoin();
        
        
        
//        Alamofire.request("https://httpbin.org/get").responseJSON { response in
//            print("Request: \(String(describing: response.request))")   // original url request
//            print("Response: \(String(describing: response.response))") // http url response
//            print("Result: \(response.result)")                         // response serialization result
//
//            if let json = response.result.value {
//                print("JSON: \(json)") // serialized json response
//            }
//
//            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
//                print("Data: \(utf8Text)") // original server data as UTF8 string
//            }
//        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    @IBAction func update(_ sender: Any) {
        priceLabel.text = "...."
        updateBitCoin()
    }
    
    
    func updateBitCoin(){
        Alamofire.request("https://api.coindesk.com/v1/bpi/currentprice.json")
            .responseJSON{response in
                
                if let bitcoinJSON = response.result.value{
                    let bitcoinObject: Dictionary = bitcoinJSON as! Dictionary<String, Any>
                    let bpiObject: Dictionary = bitcoinObject["bpi"] as! Dictionary<String, Any>
                    let usdObject: Dictionary = bpiObject["USD"] as! Dictionary<String, Any>
                    let rate: Float = usdObject["rate_float"] as! Float
                    self.priceLabel.text = "$ \(rate)"
                    print(rate)
                }
        }
    }
    

}

