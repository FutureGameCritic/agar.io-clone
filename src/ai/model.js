const tfjs = require("@tensorflow/tfjs");
// tfjs
class A3CModel {
    constructor() {
        this.n_actions = ;
    }

    get_models() {
        const conv_layers = [
            tf.layers.conv2d({
                inputShape: [84, 84, 4],
                filters: 16,
                kernelSize: 8,
                strides: 4,
                activation: "relu",
                kernelInitializer: "VarianceScaling"
            }),
            tf.layers.conv2d({
                inputShape: [20, 20, 4],
                filters: 32,
                kernelSize: 4,
                strides: 2,
                activation: "relu",
                kernelInitializer: "VarianceScaling"
            }),
            tf.layers.flatten({ inputShape: [9, 9, 32] }),
            tf.layers.dense({
                units: 256,
                activation: "relu",
                kernelInitializer: "varianceScaling"
            })
        ];

        const actor_model = tf.sequential({
            layers: conv_layers.concat(
                tf.layers.dense({
                    units: this.n_actions,
                    activation: "softmax",
                    kernelInitializer: "varianceScaling"
                }))
        });
        const critic_model = tf.sequential({
            layers: conv_layers.concat(
                tf.layers.dense({
                    units: 1,
                    activation: "none",
                    kernelInitializer: "varianceScaling"
                }))
        });
        return [actor_model, critic_model];
    }

    get_action_idx(history) {
        return tf.tidy(() => {
            const policy = this.actor_model.predict([history])[0]
            const action_idx = random.choice(this.n_actions, 1, p=policy)[0]
            return [action_idx, policy];
        });
    }

    train(observation) {

        // make history to stack observation
        // history

        const action_idx, policy = this.get_action_idx(history)

        this.all_p_max += np.amax(policy)
        // @TODO: define make_action
        const reward = game.make_action(this.actions[action_idx])
        score += reward

        const done = game.is_episode_finished()
    }

    update() {
        // update local model
        // send to global model
    }
}

class A3CModel_Teacher extends A3CModel {
    // 스스로 학습을 하고 
    // 본인이 랭킹인 경우에는 global로 weight update를 한다 (sync)
}

class A3CModel_Local extends A3CModel {
    // global로부터 최초 load weight 이후 
    // 주기적으로 sync를 맞춘다
}

class A3CModel_Global extends A3CModel {
    // Teacher와 Local로부터 update하고
    // Local로 weigth를 보낸다
}

module.exports = A3CModel;
