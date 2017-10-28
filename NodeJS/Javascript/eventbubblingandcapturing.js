          body   -- click()          |
            |                        |
            |                        |
          #main                      |
            |                        |
            |                        |
          #parent   -- click()       |
            /\                       |
          /    \                     |
      #child    #other  -- click()   |

bottom to up - event bubbling


<div id="main">
  <div id="parent">
    <div id="child">
    </div>
    <div id="other">
    </div>
  </div>
</div>

//child - parent  --> event bubbling
//parent - child ---> event capturing
