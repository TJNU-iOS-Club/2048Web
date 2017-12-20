let N = 1

function renderMatrix() {
    let result = ''
    for (let i = 0; i < N; i++) {
        result += '<div class="row">'
        for (let j = 0; j < N; j++) {
            let value = Math.min(
                Math.min(N - i, i + 1),
                Math.min(N - j, j + 1),
            )

            result += `<div class="item">
                          <div class="box"
                               style="font-size: ${90 / N * 0.95 * 0.5}vh;line-height: ${90 / N * 0.95}vh"
                          >${value}</div>
                       </div>`
        }
        result += '</div>'
    }

    return result
}

// Event
$('.add-button').on('click', function () {
    N += 1
    $('.indicator').text(`N = ${N}`)
    $('.container').html(renderMatrix())
})

$('.reduce-button').on('click', function () {
    N -= 1
    $('.indicator').text(`N = ${N}`)
    $('.container').html(renderMatrix())
})

$('.indicator').text(`N = ${N}`)
$('.container').html(renderMatrix())

