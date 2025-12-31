-- =============================================
-- Schema Version: 1.1
-- Description: FMCG ERP Database Schema with Demo Data Examples
-- Note: 'e.g.' comments show hypothetical values for the 'right portion'
-- =============================================

-- -----------------------------------------------------------------------------
-- 1. Dealers
-- -----------------------------------------------------------------------------
CREATE TABLE Dealers (
    DealerID INT PRIMARY KEY,                             -- e.g. 1001
    Name VARCHAR(255) NOT NULL,                           -- e.g. 'Metro Cash & Carry'
    Address TEXT,                                         -- e.g. '123 Market St, Dhaka'
    CreditLimit DECIMAL(15, 2) DEFAULT 0.00,              -- e.g. 50000.00
    Terms VARCHAR(50),                                    -- e.g. 'Net30'
    ActiveFlag BOOLEAN DEFAULT TRUE,                      -- e.g. 1 (True)
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,         -- e.g. '2023-01-01 10:00:00'
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP          -- e.g. '2023-06-15 14:30:00'
);

-- -----------------------------------------------------------------------------
-- 2. Products
-- -----------------------------------------------------------------------------
CREATE TABLE Products (
    SKU VARCHAR(50) PRIMARY KEY,                          -- e.g. 'NES-COF-200G'
    PackSize INT NOT NULL,                                -- e.g. 24
    Unit VARCHAR(20) NOT NULL,                            -- e.g. 'Case'
    Category VARCHAR(100),                                -- e.g. 'Beverages'
    ActiveFlag BOOLEAN DEFAULT TRUE,                      -- e.g. 1 (True)
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,         -- e.g. '2023-01-01 09:00:00'
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP          -- e.g. '2023-01-01 09:00:00'
);

-- -----------------------------------------------------------------------------
-- 3. PriceList (Master Data - Historical/Time-bound)
-- -----------------------------------------------------------------------------
CREATE TABLE PriceList (
    PriceListID INT PRIMARY KEY,                          -- e.g. 501
    SKU VARCHAR(50) NOT NULL,                             -- e.g. 'NES-COF-200G'
    RegionChannel VARCHAR(100) NOT NULL,                  -- e.g. 'Dhaka-Retail'
    EffectiveDate DATE NOT NULL,                          -- e.g. '2023-01-01'
    UnitPrice DECIMAL(10, 2) NOT NULL,                    -- e.g. 450.00
    FOREIGN KEY (SKU) REFERENCES Products(SKU),
    CONSTRAINT UQ_PriceList_Effective UNIQUE (SKU, RegionChannel, EffectiveDate)
);

-- -----------------------------------------------------------------------------
-- 4. Orders
-- -----------------------------------------------------------------------------
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,                              -- e.g. 8001
    DealerID INT NOT NULL,                                -- e.g. 1001
    OrderDate DATETIME NOT NULL,                          -- e.g. '2023-10-15 14:30:00'
    Status VARCHAR(50) DEFAULT 'Pending',                 -- e.g. 'Shipped'
    TotalAmount DECIMAL(15, 2),                           -- e.g. 13500.00
    FOREIGN KEY (DealerID) REFERENCES Dealers(DealerID),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,         -- e.g. '2023-10-15 14:30:00'
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP          -- e.g. '2023-10-16 09:15:00'
);

-- -----------------------------------------------------------------------------
-- 5. OrderLines
-- -----------------------------------------------------------------------------
CREATE TABLE OrderLines (
    OrderLineID INT PRIMARY KEY,                          -- e.g. 9001
    OrderID INT NOT NULL,                                 -- e.g. 8001
    SKU VARCHAR(50) NOT NULL,                             -- e.g. 'NES-COF-200G'
    Qty INT NOT NULL CHECK (Qty > 0),                     -- e.g. 10
    
    -- Snapshotting UnitPrice is mandatory for financial auditability.
    UnitPriceSnapshot DECIMAL(10, 2) NOT NULL,            -- e.g. 450.00
    
    LineTotal DECIMAL(15, 2),                             -- e.g. 4500.00
    
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (SKU) REFERENCES Products(SKU)
);

-- -----------------------------------------------------------------------------
-- 6. LedgerEntries (Financial Core)
-- -----------------------------------------------------------------------------
CREATE TABLE LedgerEntries (
    EntryID INT PRIMARY KEY,                              -- e.g. 7001
    DealerID INT NOT NULL,                                -- e.g. 1001
    TransactionDate DATETIME NOT NULL,                    -- e.g. '2023-10-15 14:30:00'
    TransactionType VARCHAR(50) NOT NULL,                 -- e.g. 'Invoice'
    ReferenceID VARCHAR(50),                              -- e.g. 'ORD-8001'
    
    DebitAmount DECIMAL(15, 2) DEFAULT 0.00,              -- e.g. 13500.00
    CreditAmount DECIMAL(15, 2) DEFAULT 0.00,             -- e.g. 0.00
    
    RunningBalance DECIMAL(15, 2),                        -- e.g. 13500.00
    
    FOREIGN KEY (DealerID) REFERENCES Dealers(DealerID),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP          -- e.g. '2023-10-15 14:30:00'
);
