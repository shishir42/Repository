//
//  ViewController.m
//  GCD
//
//  Created by shishir roy on 28/10/17.
//  Copyright © 2017 shishir roy. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void) viewDidAppear:(BOOL)animated{
    dispatch_queue_t queVar = dispatch_queue_create("my first queue", NULL);
    
    //dispatch_async(<#dispatch_queue_t  _Nonnull queue#>, <#^(void)block#>)
    
    dispatch_async(queVar, ^{
        NSLog(@"Hi How are u....??");
        NSString *url = @"http://microblogging.wingnity.com/JSONParsingTutorial/will.jpg";
        NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
        
        dispatch_async(dispatch_get_main_queue(), ^{
                _imageView.image = [UIImage imageWithData:data];
        });
    });
}

@end
