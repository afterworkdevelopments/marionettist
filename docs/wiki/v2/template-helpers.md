## Template helpers

All marionettist views have the next helpers:

## @t(string)

i18next translation.

**Example.**

```
# Inside templates/dashboard.hamlc

%h1
  = @t("app.title")
```

## @formatCurrency(amount, format)

Gives format to an amount. Default format is `$0,0.00`

**Example.**

```

%p
  = @t("app.price")
  = @formatCurrency(25.595988) # outputs  $25.60
```

## @formatNumber(amount, format)

Gives format to an amount. Default format is `0,0.00`

**Example.**

```

%p
  = @t("app.price")
  = @formatNumber(3598.569) # outputs  3,598.57
```

## @formatPercentage(amount, format)

Gives format to an amount. Default format is `0.00%`

**Example.**

```

%p
  = @t("app.price")
  = @formatNumber(0.974878234) # outputs  97.49%
```

## @formatDate(date, format)

Gives format date. Default format is `DD-MM-YYYY`

**Example.**

```

%p
  = @t("app.today")
  = @formatDate(new Date()) # outputs  04-09-2015
```
