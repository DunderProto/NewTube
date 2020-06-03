json.extract! user, :id, :username, :email, :color, :subscribers, :subscriptions
json.videos do
    @user.videos.each do |video|
        json.set! video.id do
            json.partial! '/api/videos/video', video: video
        end
    end
end
# json.videoCount user.videos.count