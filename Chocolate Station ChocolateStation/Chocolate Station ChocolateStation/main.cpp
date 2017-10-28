//
//  main.cpp
//  Chocolate Station ChocolateStation
//
//  Created by shishir roy on 28/10/17.
//  Copyright © 2017 shishir roy. All rights reserved.
//

#include <string>
#include <sstream>
#include <iostream>
#include <array>

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    
    int t;
    std::cin>>t;
    while(t--)
    {
        int n, tmp;
        std::cin>>n;
        std::vector<int> arr;
        while(n--)
        {
            std::cin>>tmp;
            arr.push_back(tmp);
        }
        std::cin>>tmp;
        std::cout<<getChocolateCost(arr, tmp)<<"\n";
    }
    
    return 0;
}

int getChocolateCost(std::vector<int> arr, int chocolateMrp)
{
    long int curchococlate = 0, chocolate2buy = arr[0];
    for(int i=1; i<arr.size(); i++)
    {
        int tmp = (arr[i-1]-arr[i]);
        if(tmp>-1)curchococlate+=tmp;
        else
        {
            curchococlate+=tmp;
            if(curchococlate<0)
            {
                chocolate2buy+=(curchococlate*-1);
                curchococlate=0;
            }
        }
        // cout<<tmp<<" "<<curchococlate<<' '<<chocolate2buy<<"\n";
    }
    return chocolate2buy*chocolateMrp;
}

