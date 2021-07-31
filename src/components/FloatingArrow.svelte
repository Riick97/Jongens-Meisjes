<div class="floating">
	<i class="fas fa-arrow-down" />
</div>

<style>
	.floating {
		animation-name: floating;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		margin-top: 5px;
	}

	.floating {
        font-size: 2rem;
	}

	@keyframes floating {
		from {
			transform: translate(0, 0px);
		}
		65% {
			transform: translate(0, 5px);
		}
		to {
			transform: translate(0, -0px);
		}
	}
</style>
