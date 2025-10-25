//
// Helper functions
//

export const formatNumber = (value, minimumFractionDigits, maximumFractionDigits) => new Intl
    .NumberFormat('de-DE', { minimumFractionDigits: minimumFractionDigits, maximumFractionDigits: maximumFractionDigits })
    .format(value || 0)
    .replaceAll(".", " ")

export const formatCost = (value, currencySymbol, fractionDigits) =>
    (currencySymbol || "") + " " + formatNumber(
        value || 0,
        fractionDigits ?? 2,
        fractionDigits ?? 2
    )
