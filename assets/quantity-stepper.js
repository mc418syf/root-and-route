document.addEventListener('alpine:init', () => {
  Alpine.data('QuantityStepper', () => {
    return {
      quantity: 1,
      dispatchInputChange() {
        this.$refs.quantityInput.dispatchEvent(
          new Event('change', { bubbles: true })
        );
      },
      decreaseQuantity() {
        this.quantity > 1 && this.quantity--;
        this.dispatchInputChange();
      },
      increaseQuantity() {
        this.quantity++;
        this.dispatchInputChange();
      },
    };
  });
});
