def classify_concern(text):
    t=text.lower(); rules={"INCOME":["salary","earn","income","पगार"],"JOB_SECURITY":["job","placement","नौकरी"],"SAFETY":["safe","safety","danger"],"EDUCATION":["study","education","further"],"LOCATION":["local","district","city"],"CAREER_GROWTH":["growth","future","progress"],"SOCIAL_PERCEPTION":["respect","status","social"]}
    return next((key for key,words in rules.items() if any(word in t for word in words)),"OTHER")
def sentiment(text):
    t=text.lower()
    if any(x in t for x in ["worried","afraid","tension","concern"]): return "CONCERNED"
    if any(x in t for x in ["bad","angry","hopeless"]): return "NEGATIVE"
    if any(x in t for x in ["thanks","great","good"]): return "POSITIVE"
    return "NEUTRAL"
def answer(trade,message,language):
    if not trade:return "Reliable outcome data for this specific trade/provider is currently unavailable.","OTHER"
    category=classify_concern(message); evidence=f"Based on available outcome data (DEMO DATA): {trade.name} typically shows ₹{trade.salary_min:,}–₹{trade.salary_max:,}/month, {trade.placement_rate:.0f}% placement, and NSQF Level {trade.nsqf_level}."
    detail={"SAFETY":trade.safety_information,"EDUCATION":trade.higher_education_paths,"CAREER_GROWTH":trade.career_growth,"JOB_SECURITY":"Placement is an outcome indicator, not a job guarantee."}.get(category,"You can compare options with your family or request a human counsellor.")
    return evidence+(" यह डेमो डेटा है। " if language=="hi" else " हा डेमो डेटा आहे. " if language=="mr" else " ")+detail,category
