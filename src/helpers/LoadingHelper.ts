export class LoadingHelper {
    static show () {
        document
            .querySelector('.loadingContainer')
            ?.classList.remove('hidden')
    }

    static hidden () {

        setTimeout(() => {
            document
                .querySelector('.loadingContainer')
                ?.classList.add('hidden')
        }, 300)
    }
}