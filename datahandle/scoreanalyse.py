from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/calculate_score', methods=['POST'])
def calculate_score():
    try:
        data = request.json
        player1_values = data.get('player1')
        player2_values = data.get('player2')

        # 这里进行您的得分计算
        score = compute_score(player1_values, player2_values)

        return jsonify({'success': True, 'score': score})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


def compute_score(player1_values, player2_values):
    # 使用Python的sum函数累加两名玩家的所有骰子值
    total_score = sum(player1_values) + sum(player2_values)
    return total_score

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)