# sages
SAGES (System Agnostic Global Economy Simulator) endeavors to simulate a fantasy economy with items that can be re-valued in a
number of different ways, used primarily for world-building.
## Why? 
Because immersion can be increased, of course, by raising the prices when things are scarce or a war is fast approaching, but also because Game Masters make mistakes
In Dungeons and Dragons, (though, as stated, this tool is system agnostic) a beginner GM (or one who is making up a price for something on the spot) 
will often treat gold as roughly equivalent to a dollar. For instance, a player might try to buy a 
mug of beer and the GM will reflexively say something like "1 gold" (a dollar for a beer isn't outrageous, after all). 
Later in the game, when the GM tries to use item tables, they will quickly see that changing the price of 
beer to 1 gold has either destroyed immersion (since they have to go back on their word and have the player subtract 4 copper from their inventory instead) or absolutely destroyed the economy
since 1 gold is actually equivalent to the amount an average person might need to spend in an ENTIRE DAY (and a day's worth of pocket-money IS outrageous for a beer). This tool allows GMs to keep the ratio of prices between items 
(i.e. a keg of beer is still three times the price of a pint) as well as make 1 gold the actual price of a beer. 

## Current Features
- the user can see items on cards (imported via JSON) 
- the user can individually change the price or name of any item
- the user can see and adjust the markup or discount on each item 
- the user can globally revalue all the items based on the change made to one item 
- the user can globally revert all the items to their original price 


## TO-DO 
- the user can enter their own currency system 
  

## Future Features 
- the user can see conversions between different economic systems
- items within each economy can be searched for quick lookups
- currency includes plurals for more natural price readings
- items, values, descriptions, and tags are stored in a custom API 
- items are grouped by category 
- categories of items can be selected for adjustment
- items can be added to a cart, where their values can be tallied and a markup/markdown can be applied 
- items have factors that affect the cost (like labor, transport, magic, etc.) and the prices of these features can be adjusted
- economies/countries can be divided into cities 
- cities have a size feature, which affects the prices/availability of items 
- cities have an environmental feature (mountainous, agrarian, seaside) which also affects prices/availability 
- the system can be saved/viewed by the user in an account

