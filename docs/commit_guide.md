# Commit guidelines

## commit message

-   Commit message ရေးသားခြင်းဟာ အရေးကြီးတယ်ဆိုတာ သိထားပါ
-   English လိုပဲရေးပါ
-   အောက်က စည်းကမ်းချက်တွေအတိုင်း ရေးသားပါ

commit message တစ်ခုမှာ အစိတ်အပိုင်း ၃ခု ပါဝင်တယ်

-   title
-   body (optional)
-   footer (optional)

အစိတ်အပိုင်းတစ်ခုနဲ့ တစ်ခုကြားမှာ blank line နဲ့ ပိုင်းခြားထားတယ်
body နဲ့ footer က multi-line နဲ့ ရေးလို့ရတယ်

```
title

body line1
body line2

footer line1
footer line2
```

## title

title မှာ အစိတ်အပိုင်း ၃ခု ပါဝင်တယ်

-   type
-   scope (optional)
-   subject
-   ref (optional)

title ရဲ့ format က အောက်ကအတိုင်းဖြစ်မယ်

```
type(scope): subject ref
```

scope နဲ့ ref မပါရင်တော့ ဒီလိုဖြစ်မယ်

```
type: subject
```

### type

type က အောက်က keyword တွေထဲက တစ်ခုခုဖြစ်ရမယ်

-   feat
-   fix
-   docs
-   style
-   refactor
-   perf
-   test
-   workflow
-   build
-   ci
-   chore
-   types
-   wip
-   revert

### scope

scope က ကိုယ်က ဘယ်အပိုင်းကိုလုပ်နေတာလဲဆိုတာ ဖော်ပြဖို့အတွက်သုံးတယ်
ဥပမာ `order`, `customer`, `dashboard`

### subject

-   subject မှာ လက်ရှိ commit ကို ခြုံငုံမိနိုင်တဲ့ ကျစ်လစ်တဲ့ဖော်ပြချက်ကိုရေးရမယ်
-   present tense ပဲသုံးပါ → "change", not "changed" nor "changes"
-   ပထမစာလုံးကို capitalize လုပ်စရာမလိုပါ → "change", not "Change"
-   အဆုံးမှာ period(.) ထည့်စရာမလိုပါ

ဥပမာ `send an email to the customer when a product is shipped`

### ref

လက်ရှိ commit က issue တစ်ခုခုနဲ့ ချိတ်ဆက်မှုရှိတယ်ဆိုရင် ref ထည့်ပေးရမယ်

```
#issue_no
```

### title နမူနာ

အပေါ်က type, scope, subject နဲ့ ref ကို မှန်မှန်ကန်ကန်ရေးမယ်ဆို ဒီလိုဖြစ်သွားမယ်

```
feat(customer): send an email to the customer when a product is shipped #7
```

## body

-   title ရဲ့ subject ရေးသားပုံအတိုင်း ရေးရမယ်
-   multi-line ရေးလို့ရတယ်
-   လက်ရှိ commit ကိုဘာကြောင့်လုပ်ခဲ့တယ်၊ ဘာတွေပြောင်းလဲသွားတယ်ဆိုတာ ဖော်ပြရမယ်

## footer

-   breaking changes တွေရှိတဲ့အခါ footer မှာဖော်ပြရမယ်
-   `BREAKING CHANGE: `ဆိုတဲ့ စာနဲ့ အစပြုပေးရမယ်

## ကိုးကား

https://necord.org/contributing/commit-convention/
