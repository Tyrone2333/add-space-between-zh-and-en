// ==UserScript==
// @name         选中输入框内容,给中英文之间加空格
// @namespace    https://github.com/Tyrone2333/add-space-between-zh-and-en
// @version      1.0.1
// @description  选中输入框内容,自动给中英文之间加空格
// @author       en20
// @include      http*://*
// @grant        none
// @license MIT
// @run-at		 document-start
// ==/UserScript==
(function () {

  var getSelectedText = function () {

    if (window.getSelection)
      return window.getSelection().toString()
    else if (document.getSelection)
      return document.getSelection().toString()
    else if (document.selection)
      return document.selection.createRange().text
    return ""
  }

  function addSpace(text) {
    var p1 = /([A-Za-z])((<[^<]*>)*[\u4e00-\u9fa5]+)/gi
    var r = text
    r = r.replace(p1, "$1 $2")

    // 在前面添加空格
    var p2 = /([\u4e00-\u9fa5]+(<[^<]*>)*)([A-Za-z])/gi
    r = r.replace(p2, "$1 $3")
    return r
  }


  document.addEventListener("mouseup", function (e) {
    var copyText = getSelectedText()
    if (copyText) {

      var textObj = document.querySelector('input:focus')
      if (!textObj) {
        return
      }
      var rangeStart = textObj.selectionStart
      var rangeEnd = textObj.selectionEnd
      var delValue = textObj.value.substring(rangeStart, rangeStart)
      var tempStr1 = textObj.value.substring(0, rangeStart)
      var tempStr2 = textObj.value.substring(rangeEnd)
      var textValue = tempStr1 + tempStr2
      console.log('替换输入框选中文本',copyText)

      textObj.value = tempStr1 + addSpace(copyText) + tempStr2

    } else {

      return ""
    }

  })
})()
