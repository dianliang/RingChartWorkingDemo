//
//  InterfaceController.m
//  RingChartDemoWatch Extension
//
//  Created by Mobillytics 003 on 26/7/17.
//
//

#import "InterfaceController.h"

#import "MMWormhole.h"
#import "MMWormholeSession.h"


@interface InterfaceController ()

@property (nonatomic, strong) MMWormhole *wormhole;
@property (nonatomic, strong) MMWormholeSession *listeningWormhole;


@end


@implementation InterfaceController

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];

    // Configure interface objects here.
    
//    wormhole = [[MMWormhole alloc] initWithApplicationGroupIdentifier:@"group.com.ringchart.demo.dan"
//                                                    optionalDirectory:@"testChannel"];
//    
    // You are required to initialize the shared listening wormhole before creating a
    // WatchConnectivity session transiting wormhole, as we are below.
    self.listeningWormhole = [MMWormholeSession sharedListeningSession];
    
    // Initialize the wormhole
    self.wormhole = [[MMWormhole alloc] initWithApplicationGroupIdentifier:@"group.com.ringchart.demo.dan"
                                                         optionalDirectory:@"wormhole"
                                                            transitingType:MMWormholeTransitingTypeSessionMessage];
    
    // Obtain an initial value for the selection message from the wormhole
    id messageObject = [self.wormhole messageWithIdentifier:@"TEST123"];
    NSString *string = [messageObject valueForKey:@"selectionString"];
    
    if (string != nil) {
    
        NSLog(@"default message: %@", string);
    } else
        NSLog(@"No default message!");
    
//    [wormhole listenForMessageWithIdentifier:@"testChannel" listener:^(id message) {
//        
//        NSLog(@"Received message: %@", (NSString*)message);
//    
//    }];

    // Listen for changes to the selection message. The selection message contains a string value
    // identified by the selectionString key. Note that the type of the key is included in the
    // name of the key.
    
    [self.listeningWormhole listenForMessageWithIdentifier:@"TEST123" listener:^(id messageObject) {
        
        NSLog(@"Received message!");
        
        NSString *string = [messageObject valueForKey:@"selectionString"];
        
        if (string != nil) {
            NSLog(@"Received message: %@", (NSString*)string);
        }
    }];
    
    // Make sure we are activating the listening wormhole so that it will receive new messages from
    // the WatchConnectivity framework.
    [self.listeningWormhole activateSessionListening];
    
    
}

- (void)willActivate {
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
}

- (void)didDeactivate {
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}

- (IBAction)sendBtnClicked {
    NSLog(@"sendBtn clicked@");
    [self.wormhole passMessageObject:@{@"buttonNumber" : @(15)} identifier:@"button"];
}


@end



