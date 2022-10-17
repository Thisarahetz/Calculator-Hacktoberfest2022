const operandsRequired = {
  "/":2,
  "*":2,
  "-":2,
  "+":2,
  "^":2,
  "√":1,
};
const operators = ["+", "-", "*", "/", "^", "(", ")","√"];

function prec(c) {
  if (c == "^"|| c== "√") return 3;
  else if (c == "/" || c == "*") return 2;
  else if (c == "+" || c == "-") return 1;
  else return -1;
}

//refer to this for more information https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/
//infix stores our string expression converted into seperated into operators and operands
function infixToPostfix(s) {
  // op stores the order in which operators appear in the sting expression
  let op = [];
  for(let i = 0;i<s.length;i++){
    let e = s[i];
    if (operators.includes(e)) {
      op.push(e);
    }
  }
  // ptr is the pointer to the current operator
  let ptr = 0;
  let curr_num = "";
  // generation of our infix expression
  let infix = [];
  for(let i = 0;i<s.length;i++){
    let e = s[i];
    if (e == op[ptr] && ptr < op.length) {
      if(curr_num!="")
        infix.push(curr_num);
      curr_num = "";
      infix.push(e);
      ptr++;
    } else {
      curr_num += e;

    }
  }
  if(curr_num!="")
    infix.push(curr_num);
  //creating an operator stack
  let st = [];
  let postfix = [];
  infix.forEach((e) => {
    if (!isNaN(e)) {
      postfix.push(parseFloat(e));
    } else if (e == "(") st.push(e);
    else if (e == ")") {
      while (st[st.length - 1] != "(") {
        postfix.push(st[st.length - 1]);
        st.pop();
      }
      st.pop();
    } else {
      if(operandsRequired[e]==2){
        while (st.length!=0 && prec(e) <= prec(st[st.length - 1])) {
          postfix.push(st[st.length - 1]);
          st.pop();
        }
        st.push(e);
      }
      else{
        st.push(e);
      }
    }
  });
  while (st.length!=0) {
    postfix.push(st[st.length - 1]);
    st.pop();
  }
  return postfix;
}

//for more info https://www.geeksforgeeks.org/stack-set-4-evaluation-postfix-expression/
function evaluatePostfix(postfix) {
  //create a stack
  let st = [];
  // Scan all elements one by one
  postfix.forEach((e) => {
    if (!isNaN(e)) st.push(e);
    //  If the scanned element is an operator, pop two elements from stack apply the operator
    else {
      let val1=null,val2=null;
      if(operandsRequired[e]==2){
        val1 = st.pop();
        val2 = st.pop();
      }
      else{
        val1 = st.pop();
      }
      switch (e) {
        case "+":
          st.push(val2 + val1);
          break;

        case "-":
          st.push(val2 - val1);
          break;

        case "/":
          st.push(val2 / val1);
          break;

        case "*":
          st.push(val2 * val1);
          break;
        case "^":
          st.push(val2 ** val1);
        case "√":
          st.push(Math.sqrt(val1));
      }
    }
  });
  return st.pop();
}
const res = document.getElementById("result");
export function scientific(exp) {
  let postFix = infixToPostfix(exp);
  return evaluatePostfix(postFix);
}
