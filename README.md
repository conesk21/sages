# sages
SAGES (System Agnostic Global Economy Simulator) endeavors to simulate a fantasy economy with items which can be re-valued in a
number of different ways, used primarily for world building.
## Why? 
Because immersion can increased, of course, by raising the prices when things are scarce or a war is fast approaching, but also because Game Masters make mistakes
In Dungeons and Dragons, (though, as stated, this tool is system agnostic) a begginer GM (or one who is making up a price for something on the spot) 
will often treat gold as roughly equivalent to a dollar. For instance, a player might try to buy a 
mug of beer and the GM will reflexively say something "1 gold" (a dollar for a beer isn't outrageous, afterall). 
Later in the game, when the GM tries to use item tables, they will quicly see that changing the price of 
beer to 1 gold, has either destroyed immersion (since they have to go back on their word and have the player subtract 4 copper from their inventory instead) or absolutely destroyed the economy
since 1 gold is actually equivalent to the ammount an average person might need to spend in an ENTIRE DAY (and a day's worth of pocket-money IS outragous for a beer). This tool allows GM's to keep the ratio of prices between items 
(i.e. a keg of beer is still three times the price of a pint) as well as make 1 gold the actual price of a beer. 

## Current Features
- the user can see items on cards (imported via JSON) 
- the user can indivually change the price or name of any item
- the user can see and adjust the markup or discount on each item 
- the user can globally revlaue all the items based on the change made to one item 
- the user can globally revert all the items to their original price 


## TO-DO 
- the user can enter their own currency system 
  - make submit button on the currency form create new economy (with button on sidenav)
  - add error handling to the currency form (no repeat names, no repeat denominations, nothing valued at 0, no divide by 0 ) 
  - replace "fantasy" coin system with a prop that represents a variable coin system 

## Future Features 
- items are grouped by category 
- categories of items can be selected for adjustment
- items have discriptions
- items can be added to a cart, where their values can be tallied and a markup/markdown can be applied 
- items have factors which affect cost (like labor, transport, magic, etc.) and the prices of these features can be adjusted
- economies/countries can be divided into cities 
- cities have a size feature, which affects prices/availability of items 
- cities have an environment feature (mountainous, agrarian, seaside) which also affects prices/availability 
- system can be saved/viewd by the user 

