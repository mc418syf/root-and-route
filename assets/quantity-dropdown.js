document.addEventListener('alpine:init', () => {
  Alpine.data('QuantityDropdown', () => {
    return {
      dropdownQuantity: '1',
      quantity: 1,
      enableNumberInput: false,
      dropdownQuantityChange() {
        if (this.dropdownQuantity !== '10+') {
          this.quantity = parseInt(this.dropdownQuantity, 10);
        } else {
          this.quantity = 10;
          this.enableNumberInput = true;

          const rootEl = this.$root;

          this.$nextTick(() => {
            const numberInputEl = rootEl.querySelector('[name="quantity"]');
            this.$focus.focus(numberInputEl);
            numberInputEl.select();
          });
        }
      },
    };
  });
});
