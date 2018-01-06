//All variable are declared at the top of any given function
//scope whether you like or not (include function declaration)

function hoist(track){
  if(track === 'Down with disease'){
    var action = "dance";
  }
  else{
    var action = "skip";
  }

  return action;
}

function hoist(track){
  if(track === 'Down with disease'){
    action = "dance";
  }
  else{
    action = "skip";
  }

  var action;

  return action;
}
