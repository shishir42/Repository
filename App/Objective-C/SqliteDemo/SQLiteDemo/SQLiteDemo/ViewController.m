//
//  ViewController.m
//  SQLiteDemo
//
//  Created by shishir roy on 04/12/17.
//  Copyright © 2017 shishir roy. All rights reserved.
//

#import "ViewController.h"
#import <sqlite3.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self getDatabasePath];
    [self createTable];
    [self insertData];
    [self selectData];
    [self updateData];
    [self selectData];
    [self updateDateParamatized];
    [self selectData];
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

-(NSURL*) getDatabasePath{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSURL *dbUrl = [fileManager URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
    dbUrl = [dbUrl URLByAppendingPathComponent:@"sample.sqlite"];
    return  dbUrl;
}


-(void) createTable{
    const char *dbPath = [[self getDatabasePath] absoluteString].UTF8String;
    sqlite3 *db;
    if(sqlite3_open(dbPath, &db) == SQLITE_OK)
    {
        char *errMessage;
        const char *createTable = "create table if not exists Tutorials(ID integer primary key autoincrement, Title text, Author text, PublicationDate date)";
        if(sqlite3_exec(db, createTable, NULL, NULL, &errMessage) == SQLITE_OK)
        {
            NSLog(@"Table Created");
        }
        else
        {
            NSLog(@"Falied to create table: %s", errMessage);
        }
    }
}

-(void) insertData{
    sqlite3 *db = NULL;
    const char *dbPath = [[self getDatabasePath] absoluteString].UTF8String;
    if(sqlite3_open(dbPath, &db) == SQLITE_OK)
    {
        sqlite3_stmt *statement;
        const char *insertSql = "insert into Tutorials(Title, Author, PublicationDate) values ('Intro to sqlite', 'Ray wenderlich', '2014-08-10 11:00:00')";
        
        sqlite3_prepare_v2(db, insertSql, -1, &statement, NULL);
        
        if(sqlite3_step(statement) == SQLITE_DONE)
        {
            NSLog(@"Data Inserted");
        }
        else
        {
            NSLog(@"Data Inserted Failed");
        }
        
        sqlite3_finalize(statement);
    }
}

-(void) selectData{
    sqlite3 *db = NULL;
    const char *dbPath = [[self getDatabasePath] absoluteString].UTF8String;
    if(sqlite3_open(dbPath, &db) == SQLITE_OK)
    {
        sqlite3_stmt *statement;
        const char *selectSql = "select * from Tutorials";
        if(sqlite3_prepare_v2(db, selectSql, -1, &statement, NULL) == SQLITE_OK)
        {
            while (sqlite3_step(statement) == SQLITE_ROW) {
                int rowId = sqlite3_column_int(statement, 0);
                char *title = (char *) sqlite3_column_text(statement, 1);
                char *author = (char *) sqlite3_column_text(statement, 2);
                
                NSLog(@"%d  -- %s -- %s", rowId, title, author);
            }
        }
        else
        {
            NSLog(@"Insert Failed");
        }
    }
}

-(void) updateData{
    sqlite3 *db = NULL;
    const char *dbPath = [[self getDatabasePath] absoluteString].UTF8String;
    if(sqlite3_open(dbPath, &db) == SQLITE_OK)
    {
        const char *selectSql = "update Tutorials set Title = 'XYZ' where ID = 1";
        char *updateError;
        if(sqlite3_exec(db, selectSql, NULL, NULL, &updateError) == SQLITE_DONE)
        {
            NSLog(@"table updated");
        }
        else
        {
            NSLog(@"Error while updating %s", updateError);
        }
    }
}

-(void) updateDateParamatized{
    sqlite3 *db = NULL;
    const char *dbPath = [[self getDatabasePath] absoluteString].UTF8String;
    if(sqlite3_open(dbPath, &db) == SQLITE_OK)
    {
        sqlite3_stmt *statement;
        const char* sanitizeSql = "update Tutorials set Author = ?,Title = ? where ID = 1";
        const char* author = "Chris";
        const char* tutorial = "Unity 3d";
        
        sqlite3_prepare_v2(db, sanitizeSql, -1, &statement, NULL);
        sqlite3_bind_text(statement, 1, author, -1, SQLITE_TRANSIENT);
        sqlite3_bind_text(statement, 2, tutorial, -1, SQLITE_TRANSIENT);
        
        
        if(sqlite3_step(statement) == SQLITE_DONE)
        {
            NSLog(@"Updated...");
        }
    }
}


@end
