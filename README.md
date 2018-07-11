# gml-support-thirdparty
Third-party GameMaker plugins support for GML Support.

It works, but the code doesn't seem to be standard:

```javascript
if (isChinese)
{
    const entry = gmlThirdparty.thirdfunctions[ident] || gmlThirdparty.thirdconstants[ident] || gmlThirdparty.cnthirdfunctions[ident] || gmlThirdparty.cnthirdconstants[ident];
    return entry;
}
```

Support list: [https://gmlsupport.liaronce.win/#/Moreinfo/Thirdparty](https://gmlsupport.liaronce.win/#/Moreinfo/Thirdparty)

This is an optional extension, if you do not need it, without the extension does not affect the use of GML Support.